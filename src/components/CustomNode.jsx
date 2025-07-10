import React from "react";
import { Handle, Position } from "reactflow";
import "reactflow/dist/style.css";

const CustomNode = ({ data }) => {
  return (
    <div
      style={{
        padding: 12,
        background: "#e6f4ea",
        borderRadius: 8,
        border: "2px solid #34a853",
        boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
        minWidth: 150,
        fontSize: 14,
        fontWeight: "500",
        color: "#202124",
        transition: "transform 0.2s ease, box-shadow 0.2s ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "scale(1.03)";
        e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.2)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "scale(1)";
        e.currentTarget.style.boxShadow = "0 2px 5px rgba(0, 0, 0, 0.1)";
      }}
    >
      <strong style={{ color: "#188038" }}>💬 Send Message</strong>
      <div style={{ marginTop: 4 }}>{data.label}</div>
      <Handle
        type="target"
        position={Position.Left}
        style={{ background: "#34a853" }}
      />
      <Handle
        type="source"
        position={Position.Right}
        style={{ background: "#34a853" }}
      />
    </div>
  );
};

export default CustomNode;
