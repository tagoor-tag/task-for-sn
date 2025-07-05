import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const initialTabs = [
  { id: 'tab-1', label: 'Tab 1', content: 'Content 1' },
  { id: 'tab-2', label: 'Tab 2', content: 'Content 2' },
];

function DashboardBox({ title }) {
  const [tabs, setTabs] = useState(initialTabs);
  const [activeTab, setActiveTab] = useState(tabs[0].id);

  const onDragEnd = (result) => {
    if (!result.destination) return;
    const reordered = Array.from(tabs);
    const [removed] = reordered.splice(result.source.index, 1);
    reordered.splice(result.destination.index, 0, removed);
    setTabs(reordered);
    // Keep the active tab if possible
    if (activeTab === removed.id) setActiveTab(removed.id);
  };

  return (
    <div style={{ border: '1px solid #ddd', borderRadius: 4, background: '#fafafa', height: '100%' }}>
      {/* Header/Title as drag handle */}
      <div
        className="dashboard-box-header"
        style={{
          padding: 8,
          fontWeight: 'bold',
          cursor: 'move',
          background: '#f0f0f0',
          borderBottom: '1px solid #eee',
        }}
      >
        {title}
      </div>
      {/* Tabs with drag-and-drop */}
      <div style={{ borderBottom: '1px solid #eee', background: '#f9f9f9', padding: '4px 8px' }}>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="tabs" direction="horizontal">
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                style={{ display: 'flex', gap: 8 }}
              >
                {tabs.map((tab, idx) => (
                  <Draggable key={tab.id} draggableId={tab.id} index={idx}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        onClick={() => setActiveTab(tab.id)}
                        style={{
                          padding: '6px 16px',
                          border: activeTab === tab.id ? '2px solid #1976d2' : '1px solid #ccc',
                          borderRadius: 4,
                          background: activeTab === tab.id ? '#e3f2fd' : '#fff',
                          fontWeight: activeTab === tab.id ? 'bold' : 'normal',
                          cursor: 'pointer',
                          userSelect: 'none',
                          ...provided.draggableProps.style,
                        }}
                      >
                        {tab.label}
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
      {/* Tab content */}
      <div style={{ padding: 16 }}>
        {tabs.find((tab) => tab.id === activeTab)?.content}
      </div>
    </div>
  );
}

export default DashboardBox;