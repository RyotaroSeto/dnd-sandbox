'use client'
import React, { useState, useCallback } from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

import './styles/pages.css'
import Header from '../components/Header'
import Group from '../components/Group'
import useGroupedItems from '../hooks/useGroupedItems'
import { items as initial, GroupTypes, MoveHandler } from '../model/data'

export default function Home() {
  const [groupedItems, items, setItems] = useGroupedItems(initial)
  const moveItem: MoveHandler = useCallback(
    (dragIndex, targetIndex, group) => {
      const item = items[dragIndex]
      if (!item) return
      setItems((prevState) => {
        const newItems = prevState.filter((_, idx) => idx !== dragIndex)
        newItems.splice(targetIndex, 0, { ...item, group })
        return newItems
      })
    },
    [items, setItems]
  )
  const [isHorizontal, setIsHorizontal] = useState(true)
  let index = 0

  return (
    <div className="app">
      <Header
        isHorizontal={isHorizontal}
        onChangeIsHorizontal={setIsHorizontal}
      />
      <div className={isHorizontal ? 'horizontal' : ''}>
        <DndProvider backend={HTML5Backend}>
          {GroupTypes.map((group) => {
            const items = groupedItems[group]
            const firstIndex = index
            if (items === undefined) return null
            index = index + items.length

            return (
              <section
                key={group}
                className={[
                  'group-section',
                  isHorizontal ? 'horizontal' : '',
                ].join(' ')}
              >
                <Group
                  items={items}
                  groupType={group}
                  firstIndex={firstIndex}
                  onMove={moveItem}
                />
              </section>
            )
          })}
        </DndProvider>
      </div>
    </div>
  )
}
