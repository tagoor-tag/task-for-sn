import React, { useState } from 'react';
import GridLayout from 'react-grid-layout';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import DashboardBox from './DashboardBox';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

const initialTabs = [
  { id: 'tab-1', label: 'Tab 1' },
  { id: 'tab-2', label: 'Tab 2' },
  { id: 'tab-3', label: 'Tab 3' },
];

const initialLayout = [
  { i: '1', x: 0, y: 0, w: 4, h: 2 },
  { i: '2', x: 4, y: 0, w: 4, h: 2 },
  { i: '3', x: 8, y: 0, w: 4, h: 2 },
];

function Dashboard() {
  const [tabs, setTabs] = useState(initialTabs);
  const [layout, setLayout] = useState(initialLayout);

  // Tab reordering handler
  const onDragEnd = (result) => {
    if (!result.destination) return;
    const reordered = Array.from(tabs);
    const [removed] = reordered.splice(result.source.index, 1);
    reordered.splice(result.destination.index, 0, removed);
    setTabs(reordered);
  };

  return (
    <div>
      {/* Tab Reordering */}
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="tabs" direction="horizontal">
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps} style={{ display: 'flex', marginBottom: 16 }}>
              {tabs.map((tab, idx) => (
                <Draggable key={tab.id} draggableId={tab.id} index={idx}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={{
                        padding: '8px 16px',
                        border: '1px solid #ccc',
                        borderRadius: 4,
                        marginRight: 8,
                        background: '#fff',
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

      {/* Draggable/Resizable Grid */}
      <GridLayout
        className="layout"
        layout={layout}
        cols={12}
        rowHeight={60}
        width={1200}
        onLayoutChange={setLayout}
        draggableHandle=".dashboard-box-header"
      >
        {tabs.map((tab, idx) => (
          <div key={idx + 1} data-grid={layout[idx]}>
            <DashboardBox title={tab.label} />
          </div>
        ))}
      </GridLayout>
    </div>
  );
}

export default Dashboard;