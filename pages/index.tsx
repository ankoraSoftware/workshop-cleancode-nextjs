'use client' // HINT: You probably want to remove this
import { CheckCircleIcon } from '@heroicons/react/24/solid'
import {
  CheckCircleIcon as CheckCircleIconOutline,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import { ChangeEvent, useCallback, useEffect, useState } from 'react'
import { Todo } from '../@types/todo'
import {
  deleteTodoRequest,
  getTodosRequest,
  submitTodoRequest,
  updateTodoDoneStateRequest,
} from '../utils/api'
import dayjs from 'dayjs'

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<null | string>(null)

  const loadTodos = useCallback(async () => {
    setLoading(true)
    try {
      const serverTodos = await getTodosRequest()
      setTodos(serverTodos)
    } catch (e) {
      console.log('Internal error', e)
      setError('Something went wrong while fetching new Todos.')
    }
    setLoading(false)
  }, [setTodos, setError, setLoading])

  const handleSubmit = useCallback(async (input: string) => {
    setLoading(true)
    try {
      const serverTodos = await submitTodoRequest(input)
      setTodos(serverTodos)
    } catch (e) {
      console.log('Internal error', e)
      setError('Something went wrong while fetching new Todos.')
    }
    setLoading(false)
  }, [])

  const handleUpdate = useCallback(async (todoId: number, status: boolean) => {
    setLoading(true)
    try {
      const serverTodos = await updateTodoDoneStateRequest(todoId, status)
      setTodos(serverTodos)
    } catch (e) {
      console.log('Internal error', e)
      setError('Something went wrong while fetching new Todos.')
    }
    setLoading(false)
  }, [])

  const handleDelete = useCallback(async (todoId: number) => {
    setLoading(true)
    try {
      const serverTodos = await deleteTodoRequest(todoId)
      setTodos(serverTodos)
    } catch (e) {
      console.log('Internal error', e)
      setError('Something went wrong while fetching new Todos.')
    }
    setLoading(false)
  }, [])

  useEffect(() => {
    loadTodos()
  }, [loadTodos])

  return (
    <div className="w-screen h-screen bg-gradient-to-bl from-blue-100 to-blue-200 flex items-center justify-center font-light">
      <div className="w-[500px] rounded-2xl shadow-blue-300 shadow-lg">
        <div className="rounded-tl-2xl rounded-tr-2xl w-full min-h-[120px] bg-gradient-to-l from-cyan-700 to-cyan-800 p-8 flex flex-row items-center justify-between">
          <div>
            <div className="text-white text-2xl font-thin">
              {dayjs(new Date()).format('MMM DD, YYYY')}
            </div>
            <div className="text-white font-thin">
              {dayjs(new Date()).format('dddd')}
            </div>
          </div>
          {loading ? (
            <div role="status">
              <svg
                aria-hidden="true"
                className="mr-2 w-8 h-8 text-gray-200 animate-spin dark:text-gray-100 fill-cyan-400"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
              <span className="sr-only">Loading...</span>
            </div>
          ) : null}
        </div>
        {todos.map((todo) => (
          <div
            key={todo.id}
            className="group relative w-full min-h-[100px] bg-white flex items-center  pl-8 pr-8 border-b-2 border-b-gray-200"
          >
            <div className="flex-1">
              <div className="leading-5 mb-1 block box-border">
                {todo.description}
              </div>
              <div className="text-xs text-gray-400 italic">
                {dayjs(todo.timestamp).format('DD.MM.YYYY HH:mm')}
              </div>
            </div>

            {todo.done ? (
              <CheckCircleIcon
                onClick={() => handleUpdate(todo.id, false)}
                className="w-[40px] h-[40px] text-green-700 hover:text-red-800 cursor-pointer"
              />
            ) : (
              <CheckCircleIconOutline
                onClick={() => handleUpdate(todo.id, true)}
                className="w-[40px] h-[40px] text-gray-500 hover:text-green-700 cursor-pointer"
              />
            )}
            <div className="absolute transition-all opacity-0 group-hover:opacity-100 right-[-50px] w-[50px] h-[100px] flex items-center justify-center">
              <XMarkIcon
                onClick={() => handleDelete(todo.id)}
                className="w-[20px] h-[20px] text-red-600 hover:text-red-900 cursor-pointer"
              />
            </div>
          </div>
        ))}
        {error ? (
          <div className="w-full h-[50px] bg-red-700 flex items-center justify-center text-white">
            {error}
          </div>
        ) : null}
        <input
          id="todo"
          onKeyDown={(e) => {
            const changeEvent = e as unknown as ChangeEvent<HTMLInputElement>
            if (e.keyCode === 13) {
              handleSubmit(changeEvent.target.value)
            }
          }}
          className="rounded-bl-2xl rounded-br-2xl w-full h-[100px] text-xl focus:outline-0 p-8"
          placeholder="Insert new todo... (Press Enter to submit)"
        />
      </div>
    </div>
  )
}
