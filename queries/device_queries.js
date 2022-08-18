export const devices_query = "SELECT id, raspberry_unique, country, city, longitude, langitude FROM device";

export const device_by_serial_query = "SELECT id, raspberry_unique, country, city, longitude, langitude from Device WHERE raspberry_unique = ?";