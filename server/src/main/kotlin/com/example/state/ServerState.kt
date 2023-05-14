package com.example.state

import com.example.events.outbound.PlayerPosition
import com.example.events.outbound.PlayerPositionList
import com.example.events.outbound.PlayerPositionsUpdatedEvent
import com.example.sendEvent
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Job
import kotlinx.coroutines.delay
import kotlinx.coroutines.launch
import java.time.ZonedDateTime
import java.util.*
import kotlin.math.sqrt

const val DELAY_BETWEEN_TICKS_MS: Long = 100
const val BASE_PLAYER_SPEED = 100

data class ServerState(
    var connections: Set<Connection> = Collections.synchronizedSet(LinkedHashSet())
) {
    private var isRunning = false
    private var lastTickRuntime = 0L

    fun start() {
        isRunning = true
        CoroutineScope(Job()).launch {
            while (isRunning) {
                delay(DELAY_BETWEEN_TICKS_MS - lastTickRuntime)
                val tickStartTime = System.currentTimeMillis()

                val deltaSeconds = DELAY_BETWEEN_TICKS_MS / 1000.0

                val maxDistanceToTravel = BASE_PLAYER_SPEED * deltaSeconds

                connections.forEach {
                    val differenceX = it.targetX - it.positionX
                    val differenceY = it.targetY - it.positionY
                    val magnitude = sqrt(differenceX * differenceX + differenceY * differenceY)
                    if (magnitude <= maxDistanceToTravel) {
                        it.positionX = it.targetX
                        it.positionY = it.targetY
                    } else {
                        it.positionX += (differenceX / magnitude) * maxDistanceToTravel
                        it.positionY += (differenceY / magnitude) * maxDistanceToTravel
                    }
                }

                val updatePlayerPositionsEvent = PlayerPositionsUpdatedEvent(
                    PlayerPositionList(
                        connections.map {
                            PlayerPosition(
                                it.username,
                                it.positionX,
                                it.positionY
                            )
                        }
                    )
                )

                connections.forEach {
                    it.session.sendEvent(updatePlayerPositionsEvent)
                }

                lastTickRuntime = System.currentTimeMillis() - tickStartTime
            }
        }
    }
}