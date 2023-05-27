import { useEffect, useRef, useState } from 'react'
import { eventBusService } from '../services/event-bus.service'

export default function UserMsg() {
  const [msg, setMsg] = useState(null)
  const timeoutIdRef = useRef()

  useEffect(() => {
    const unsubscribe = eventBusService.on('show-user-msg', (msg) => {
      setMsg(msg)
      if (timeoutIdRef.current) {
        timeoutIdRef.current = null
        clearTimeout(timeoutIdRef.current)
      }
      timeoutIdRef.current = setTimeout(closeMsg, 3000)
    })
    return unsubscribe
  }, [])

  function closeMsg() {
    setMsg(null)
  }

  if (!msg) return <span></span>
  return (
    <section className="user-msg">
      {msg.txt}
      <button onClick={closeMsg}>
        <i className="fa-solid fa-xmark"></i>
      </button>
    </section>
  )
}
