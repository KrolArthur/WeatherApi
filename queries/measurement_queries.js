export const measurements_query = "SELECT id, temperature, humidity, create_date, device_id FROM measurement";

export const measurement_query = "SELECT id, temperature, humidity, create_date, device_id FROM measurement WHERE id = ?";

export const measurement_create_query = "INSERT INTO measurement (temperature, humidity, device_id, create_date) VALUES (?, ?, ?, ?);";

export const measurement_delete_query = "DELETE FROM measurement WHERE Id = ?;"