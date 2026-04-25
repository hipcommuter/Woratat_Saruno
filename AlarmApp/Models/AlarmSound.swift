import Foundation

enum AlarmSound: String, CaseIterable, Codable, Identifiable {
    case radar = "Radar"
    case beacon = "Beacon"
    case chimes = "Chimes"
    case classic = "Classic"
    case waves = "Waves"

    var id: String { rawValue }

    var displayName: String { rawValue }

    var fileName: String {
        switch self {
        case .radar: return "radar.caf"
        case .beacon: return "beacon.caf"
        case .chimes: return "chimes.caf"
        case .classic: return "classic.caf"
        case .waves: return "waves.caf"
        }
    }
}
