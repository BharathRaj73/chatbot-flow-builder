import React from "react";

const SettingsPanel = ({ selectedNode, onChange }) => {
  if (!selectedNode) return null;

  return (
    <aside style={{ padding: 10 }}>
      <h3 style={{ marginTop: 0, color: "#1a73e8" }}>📝 Edit Message</h3>
      <textarea
        value={selectedNode.data.label}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Enter message..."
      />
    </aside>
  );
};

export default SettingsPanel;
