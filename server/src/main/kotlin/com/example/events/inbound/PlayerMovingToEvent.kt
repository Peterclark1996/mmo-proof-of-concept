package com.example.events.inbound

import arrow.core.Either
import arrow.core.right
import com.example.events.IReceivable
import com.example.state.Connection
import com.example.state.ServerState
import kotlinx.serialization.Serializable

@Serializable
data class PlayerMovingToEvent (
    val x: Double,
    val y: Double
): IReceivable {
    override suspend fun onReceive(currentConnection: Connection, serverState: ServerState): Either<Error, Unit> {
        currentConnection.targetX = x
        currentConnection.targetY = y
        return Unit.right()
    }
}