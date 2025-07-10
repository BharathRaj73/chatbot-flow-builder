import React from 'react';

const NodesPanel = () => {
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <aside style={{ padding: 10 }}>
      <div
  onDragStart={(e) => onDragStart(e, 'messageNode')}
  draggable
  style={{
    padding: '12px',
    backgroundColor: '#e8f0fe',
    border: '2px dashed #4285f4',
    borderRadius: '8px',
    textAlign: 'center',
    marginTop: '10px',
    cursor: 'grab',
    fontWeight: '700',
    color: 'black',
  }}
>
  ➕ Message
</div>

    </aside>
  );
};

export default NodesPanel;
