package com.example.state

import io.ktor.websocket.*
import java.util.concurrent.atomic.AtomicInteger

class Connection(val session: DefaultWebSocketSession) {
    companion object {
        val lastId = AtomicInteger(0)
    }
    val id = lastId.getAndIncrement()
    var username = ""
    var targetX = 0.0
    var targetY = 0.0
    var positionX = 0.0
    var positionY = 0.0
}