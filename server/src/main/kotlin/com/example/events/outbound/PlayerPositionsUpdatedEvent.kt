package com.example.events.outbound

import com.example.events.IOutboundEvent
import kotlinx.serialization.Serializable

@Serializable
data class PlayerPositionsUpdatedEvent(
    val data: PlayerPositionList,
    val type: Int = IOutboundEvent.PlayerPositionsUpdatedEvent
)

@Serializable
data class PlayerPositionList(
    val playerPositions: List<PlayerPosition>
)

@Serializable
data class PlayerPosition(
    val playerId: String,
    val x: Double,
    val y: Double
)