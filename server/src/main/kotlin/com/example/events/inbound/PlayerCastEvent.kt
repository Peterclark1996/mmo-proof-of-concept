package com.example.events.inbound

import arrow.core.Either
import arrow.core.left
import arrow.core.right
import com.example.events.IReceivable
import com.example.state.Connection
import com.example.state.ServerState
import kotlinx.serialization.Serializable

@Serializable
data class PlayerCastEvent(
    val playerX: Double,
    val playerY: Double,
    val targetX: Double,
    val targetY: Double,
    val spellName: String
) : IReceivable {
    override suspend fun onReceive(currentConnection: Connection, serverState: ServerState): Either<Error, Unit> {
        val spellCast = try {
            Spell.valueOf(spellName).right()
        } catch (error: Error) {
            error.left()
        }

        return Unit.right()
    }
}

enum class Spell {
    FIRE_BALL
}