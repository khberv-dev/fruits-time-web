import {useEffect, useRef, useState} from "react"
import {Button, Spin, Text, TextArea} from "@gravity-ui/uikit"
import {PaperPlane, Sparkles} from "@gravity-ui/icons"
import {useHeader} from "@/providers/header.jsx"
import {useGetAdvisorHistory, useAskAdvisor} from "@/services/advisor/query.js"
import s from "./main.module.css"

function Message({role, text}) {
    const isUser = role === 'user'
    return (
        <div className={`${s.message} ${isUser ? s.messageUser : s.messageModel}`}>
            {!isUser && (
                <div className={s.avatar}>
                    <Sparkles width={16} height={16}/>
                </div>
            )}
            <div className={`${s.bubble} ${isUser ? s.bubbleUser : s.bubbleModel}`}>
                <Text variant="body-2">{text}</Text>
            </div>
        </div>
    )
}

export default function AdvisorPage() {
    const {setHeader} = useHeader()
    const [input, setInput] = useState('')
    const [messages, setMessages] = useState(null)
    const bottomRef = useRef(null)

    const {data: history, isLoading: historyLoading} = useGetAdvisorHistory()

    const {mutate: ask, isPending} = useAskAdvisor({
        onSuccess: (data) => {
            setMessages(prev => [...prev, {role: 'model', text: data.text}])
        },
    })

    useEffect(() => {
        setHeader({title: 'AI Maslahatchi'})
    }, [])

    useEffect(() => {
        if (history && messages === null) {
            setMessages(history)
        }
    }, [history])

    useEffect(() => {
        bottomRef.current?.scrollIntoView({behavior: 'smooth'})
    }, [messages, isPending])

    const handleSend = () => {
        const text = input.trim()
        if (!text || isPending) return
        setInput('')
        setMessages(prev => [...prev, {role: 'user', text}])
        ask(text)
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault()
            handleSend()
        }
    }

    return (
        <div className={s.root}>
            <div className={s.messages}>
                {historyLoading ? (
                    <div className={s.center}><Spin size="l"/></div>
                ) : messages?.length === 0 ? (
                    <div className={s.empty}>
                        <div className={s.emptyIcon}><Sparkles width={40} height={40}/></div>
                        <Text variant="subheader-2" color="secondary">Biznes savolingizni bering</Text>
                        <Text variant="body-2" color="hint">Savdo, buyurtmalar, mahsulotlar va filiallar bo'yicha ma'lumot</Text>
                    </div>
                ) : (
                    messages?.map((msg, i) => (
                        <Message key={i} role={msg.role} text={msg.text}/>
                    ))
                )}
                {isPending && (
                    <div className={`${s.message} ${s.messageModel}`}>
                        <div className={s.avatar}><Sparkles width={16} height={16}/></div>
                        <div className={`${s.bubble} ${s.bubbleModel} ${s.bubbleTyping}`}>
                            <Spin size="xs"/>
                        </div>
                    </div>
                )}
                <div ref={bottomRef}/>
            </div>

            <div className={s.inputBar}>
                <TextArea
                    className={s.input}
                    value={input}
                    onUpdate={setInput}
                    onKeyDown={handleKeyDown}
                    placeholder="Savol yozing... (Enter — yuborish, Shift+Enter — yangi qator)"
                    minRows={1}
                    maxRows={5}
                    disabled={isPending}
                />
                <Button
                    view="action"
                    size="l"
                    onClick={handleSend}
                    disabled={!input.trim() || isPending}
                    loading={isPending}
                >
                    <Button.Icon><PaperPlane/></Button.Icon>
                </Button>
            </div>
        </div>
    )
}
