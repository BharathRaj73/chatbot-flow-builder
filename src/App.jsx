import React, { useState, useCallback } from "react";
import ReactFlow, {
  addEdge,
  applyNodeChanges,
  applyEdgeChanges,
  MiniMap,
  Controls,
  Background,
  MarkerType,
} from "reactflow";
import "reactflow/dist/style.css";

import NodesPanel from "./components/NodesPanel";
import SettingsPanel from "./components/SettingsPanel";
import { nodeTypes } from "./flow/nodeTypes";
import { validateFlow } from "./flow/utils";

let id = 0;
const getId = () => `node_${id++}`;

const App = () => {
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [selectedNode, setSelectedNode] = useState(null);
  const [error, setError] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  // Handle node position, dragging, deletion
  const onNodesChange = useCallback((changes) => {
    setNodes((nds) => applyNodeChanges(changes, nds));
  }, []);

  const onEdgesChange = useCallback((changes) => {
    setEdges((eds) => applyEdgeChanges(changes, eds));
  }, []);

  // Only allow one outgoing edge per node
  const onConnect = useCallback(
    (connection) => {
      const existing = edges.find((e) => e.source === connection.source);
      if (existing) return;

      const newEdge = {
        ...connection,
        animated: true,
        markerEnd: { type: MarkerType.ArrowClosed },
        style: { stroke: "#34a853" },
      };
      setEdges((eds) => addEdge(newEdge, eds));
    },
    [edges]
  );

  // Drag & Drop a node onto the canvas
  const onDrop = useCallback((event) => {
    event.preventDefault();
    const type = event.dataTransfer.getData("application/reactflow");
    const position = { x: event.clientX - 260, y: event.clientY - 40 };
    const newNode = {
      id: getId(),
      type,
      position,
      data: { label: "text message" },
    };
    setNodes((nds) => [...nds, newNode]);
  }, []);

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  // Click on node → open settings panel
  const onNodeClick = (event, node) => {
    setSelectedNode(node);
  };

  // Update node label from settings
  const onTextChange = (value) => {
    setNodes((prev) =>
      prev.map((n) =>
        n.id === selectedNode.id
          ? { ...n, data: { ...n.data, label: value } }
          : n
      )
    );
    setSelectedNode((prev) => ({
      ...prev,
      data: { ...prev.data, label: value },
    }));
  };

  // Save button handler
  const handleSave = () => {
    const isValid = validateFlow(nodes, edges);
    if (!isValid) {
      setError("Cannot save Flow");
      return;
    }
    setError("");
    alert("✅ Message saved successfully!");
  };

  return (
    <div
      className={darkMode ? "dark" : ""}
      style={{ display: "flex", height: "100vh" }}
    >
      {/* Left Panel */}
      <div
        style={{
          width: 250,
          borderRight: "1px solid #ddd",
          background: "#fff",
        }}
      >
        {selectedNode ? (
          <SettingsPanel selectedNode={selectedNode} onChange={onTextChange} />
        ) : (
          <NodesPanel />
        )}
      </div>

      {/* Flow Canvas */}
      <div
        style={{ flexGrow: 1, background: darkMode ? "#1e1e1e" : "#f6f9fc" }}
        onDrop={onDrop}
        onDragOver={onDragOver}
      >
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onNodeClick={onNodeClick}
          nodeTypes={nodeTypes}
          fitView
        >
          <MiniMap />
          <Controls />
          <Background />
        </ReactFlow>
      </div>

      {/* Right Panel */}
      <div
        style={{
          width: 250,
          padding: 10,
          background: "#fff",
          borderLeft: "1px solid #ddd",
        }}
      >
        <button
          onClick={handleSave}
          style={{
            backgroundColor: "#007bff",
            color: "white",
            padding: "10px 20px",
            fontSize: "16px",
            borderRadius: "999px", // fully rounded (pill shape)
            border: "none",
            cursor: "pointer",
            transition: "all 0.3s ease",
            width: "100%",
          }}
        >
          💾 Save Changes
        </button>
        <button
          onClick={() => setDarkMode((prev) => !prev)}
          style={{
            marginTop: "10px",
            backgroundColor: darkMode ? "#444" : "#f0f0f0",
            color: darkMode ? "#fff" : "#333",
            padding: "10px 20px",
            borderRadius: "999px",
            border: "1px solid",
            borderColor: darkMode ? "#666" : "#ccc",
            cursor: "pointer",
            width: "100%",
            transition: "all 0.3s ease",
            fontWeight: "500",
            boxShadow: darkMode
              ? "0 2px 5px rgba(255, 255, 255, 0.1)"
              : "0 2px 5px rgba(0, 0, 0, 0.1)",
          }}
        >
          {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
        </button>

        {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}
      </div>
    </div>
  );
};

export default App;
