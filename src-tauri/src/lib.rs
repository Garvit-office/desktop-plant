use tauri::{Manager, PhysicalPosition, Position};

#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![greet])
        .setup(|app| {
            let window = app
                .get_webview_window("main")
                .expect("main companion window should exist");

            if let Some(monitor) = window.current_monitor()? {
                let monitor_position = monitor.position();
                let monitor_size = monitor.size();
                let window_size = window.outer_size()?;
                let x = monitor_position.x + monitor_size.width as i32 - window_size.width as i32;

                window.set_position(Position::Physical(PhysicalPosition::new(x, monitor_position.y)))?;
            }

            window.set_ignore_cursor_events(true)?;
            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
