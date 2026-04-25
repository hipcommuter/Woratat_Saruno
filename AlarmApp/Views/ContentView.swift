import SwiftUI

struct ContentView: View {
    @EnvironmentObject private var store: AlarmStore
    @State private var editingAlarm: Alarm?
    @State private var showingNewAlarm = false

    var body: some View {
        NavigationStack {
            Group {
                if store.alarms.isEmpty {
                    emptyState
                } else {
                    alarmList
                }
            }
            .navigationTitle("Alarm")
            .toolbar {
                ToolbarItem(placement: .topBarLeading) {
                    EditButton()
                }
                ToolbarItem(placement: .topBarTrailing) {
                    Button {
                        showingNewAlarm = true
                    } label: {
                        Image(systemName: "plus")
                            .font(.title3.weight(.semibold))
                    }
                }
            }
            .sheet(isPresented: $showingNewAlarm) {
                AlarmEditorView(mode: .create) { newAlarm in
                    Task { await store.add(newAlarm) }
                }
            }
            .sheet(item: $editingAlarm) { alarm in
                AlarmEditorView(mode: .edit(alarm)) { updated in
                    Task { await store.update(updated) }
                }
            }
        }
    }

    private var alarmList: some View {
        List {
            ForEach(store.alarms) { alarm in
                AlarmRowView(alarm: alarm) { isOn in
                    Task { await store.toggle(alarm, isEnabled: isOn) }
                }
                .contentShape(Rectangle())
                .onTapGesture { editingAlarm = alarm }
            }
            .onDelete { offsets in
                Task { await store.delete(at: offsets) }
            }
        }
        .listStyle(.plain)
    }

    private var emptyState: some View {
        VStack(spacing: 16) {
            Image(systemName: "alarm")
                .font(.system(size: 60))
                .foregroundStyle(.secondary)
            Text("No Alarms")
                .font(.title2.weight(.semibold))
            Text("Tap + to add your first alarm")
                .foregroundStyle(.secondary)
        }
        .frame(maxWidth: .infinity, maxHeight: .infinity)
    }
}

#Preview {
    ContentView()
        .environmentObject(AlarmStore())
}
