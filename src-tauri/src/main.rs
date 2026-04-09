#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

use cpal::traits::{DeviceTrait, HostTrait};
use serde::{Serialize, Serializer};
use std::fs::File;
use std::path::{Path, PathBuf};
use std::{fs, io};
use walkdir::WalkDir;
use zip::write::SimpleFileOptions;
use zip::ZipWriter;

fn main() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .plugin(tauri_plugin_fs::init())
        .invoke_handler(tauri::generate_handler![copy, zip, list_audio_devices])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

#[tauri::command]
fn zip(src: String, dst: String) {
    let source_path = Path::new(src.as_str());
    let destination_path = PathBuf::from(dst.as_str());

    let zip_file = File::create(destination_path).unwrap();
    let mut zip_writer = ZipWriter::new(zip_file);

    for entry in WalkDir::new(source_path) {
        let entry = entry.unwrap();
        let path = entry.path();

        let zip_path = path.strip_prefix(source_path).unwrap().to_str().unwrap();

        if path.is_file() {
            zip_writer
                .start_file(
                    zip_path,
                    SimpleFileOptions::default()
                        .compression_method(zip::CompressionMethod::Stored)
                        .unix_permissions(0o755),
                )
                .unwrap();
            let mut file = File::open(path).unwrap();
            io::copy(&mut file, &mut zip_writer).unwrap();
        }
    }

    zip_writer.finish().unwrap();
}

fn copy_dir_all(src: impl AsRef<Path>, dst: impl AsRef<Path>) -> io::Result<()> {
    fs::create_dir_all(&dst)?;
    for entry in fs::read_dir(src)? {
        let entry = entry?;
        let ty = entry.file_type()?;
        if ty.is_dir() {
            copy_dir_all(entry.path(), dst.as_ref().join(entry.file_name()))?;
        } else {
            fs::copy(entry.path(), dst.as_ref().join(entry.file_name()))?;
        }
    }
    Ok(())
}

#[tauri::command]
fn copy(src: String, dst: String) {
    let source_path = Path::new(src.as_str());
    let destination_path = Path::new(dst.as_str());
    copy_dir_all(source_path, destination_path).unwrap();
}

#[derive(Debug, PartialEq)]
enum DeviceDirection {
    Input,
    Output,
}

impl Serialize for DeviceDirection {
    fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
    where
        S: Serializer,
    {
        let v = match self {
            DeviceDirection::Input => 0u8,
            DeviceDirection::Output => 1u8,
        };
        serializer.serialize_u8(v)
    }
}

#[derive(Serialize)]
struct AudioDeviceInfo {
    name: String,
    id: Option<String>,
    driver: Option<String>,
    direction: DeviceDirection,
    is_default: bool,
}

#[tauri::command]
fn list_audio_devices() -> Result<Vec<AudioDeviceInfo>, String> {
    let host = cpal::default_host();

    let default_input_name = host
        .default_input_device()
        .and_then(|d| match d.description() {
            Ok(desc) => Some(desc.name().to_string()),
            Err(e) => {
                eprintln!("Failed to get DefaultInputDeviceName: {e}");
                None
            }
        });
    let default_output_name = host
        .default_output_device()
        .and_then(|d| match d.description() {
            Ok(desc) => Some(desc.name().to_string()),
            Err(e) => {
                eprintln!("Failed to get DefaultOutputDeviceName: {e}");
                None
            }
        });

    let devices = host.devices().map_err(|e| e.to_string())?;

    let mut result = Vec::new();

    for device in devices {
        let description = match device.description() {
            Ok(desc) => desc,
            Err(e) => {
                eprintln!("Failed to get DeviceDescription: {e}");
                continue;
            }
        };

        let name = description.name().to_string();

        let id = match device.id() {
            Ok(id) => Some(id.to_string()),
            Err(e) => {
                eprintln!("Failed to get DeviceId for {}: {e}", name);
                None
            }
        };

        let driver = description.driver().map(|s| s.to_string());

        let is_input = device.default_input_config().is_ok()
            || device
                .supported_input_configs()
                .map(|mut c| c.next().is_some())
                .unwrap_or(false);

        let is_output = device.default_output_config().is_ok()
            || device
                .supported_output_configs()
                .map(|mut c| c.next().is_some())
                .unwrap_or(false);

        let direction = if is_input && !is_output {
            DeviceDirection::Input
        } else {
            DeviceDirection::Output
        };

        let is_default = default_input_name.as_deref().is_some_and(|n| n == name)
            || default_output_name.as_deref().is_some_and(|n| n == name);

        result.push(AudioDeviceInfo {
            name,
            id,
            direction,
            driver,
            is_default,
        });
    }

    Ok(result)
}
