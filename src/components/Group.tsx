import React, { useState } from 'react'
import { useDrop } from 'react-dnd'

import './Group.css'
import Item from './Item'
import Draggable from './Draggable'
import {
  Item as _Item,
  ItemWithIndex,
  GroupType,
  ItemTypes,
  TitleMap,
  MoveHandler,
} from '../model/data'

const Group: React.FC<{
  items: _Item[]
  groupType: GroupType
  firstIndex: number
  onMove: MoveHandler
}> = ({ items, groupType, firstIndex, onMove }) => {
  const [, ref] = useDrop({
    accept: ItemTypes,
    hover(dragItem: ItemWithIndex) {
      const dragIndex = dragItem.index
      if (dragItem.group === groupType) return
      const targetIndex =
        dragIndex < firstIndex
          ? // forward
            firstIndex + items.length - 1
          : // backward
            firstIndex + items.length
      onMove(dragIndex, targetIndex, groupType)
      dragItem.index = targetIndex
      dragItem.group = groupType
    },
  })

  const [todos, setTodos] = useState<string[]>([])
  const [newTodo, setNewTodo] = useState('')
  const addTodo = () => {
    setTodos([...todos, newTodo])
    setNewTodo('')
  }

  const deleteTodo = (todo: string) => {
    setTodos(todos.filter((t) => t !== todo))
  }

  return (
    <div className={['group', groupType].join(' ')}>
      <h2>
        <span className="count">{items.length}</span>
        {TitleMap[groupType]}
      </h2>
      <ul className="list" ref={ref}>
        {items.map((item, i) => {
          return (
            <li key={item.id} className="item-wrapper">
              <Draggable item={item} index={firstIndex + i} onMove={onMove}>
                <Item id={item.id} contents={item.contents} />
              </Draggable>
            </li>
          )
        })}
      </ul>
      <div>
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
        />
        <button onClick={addTodo}>Add Card</button>
        <ul>
          {todos.map((todo, i) => (
            <li key={i}>{todo}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default Group
