package com.example.events

import arrow.core.Either
import arrow.core.left
import com.example.events.inbound.PlayerCastEvent
import com.example.events.inbound.PlayerMovingToEvent
import com.example.events.inbound.PlayerSetUsernameEvent
import com.example.parse
import kotlinx.serialization.Serializable

@Serializable
data class InboundEvent(val type: Int, val data: String)

fun deserializeEventData(event: InboundEvent): Either<Error, IReceivable> =
    when(event.type){
        0 -> PlayerMovingToEvent.serializer().parse(event.data)
        1 -> PlayerCastEvent.serializer().parse(event.data)
        2 -> PlayerSetUsernameEvent.serializer().parse(event.data)
        else -> Error("Event id not recognised: ${event.type}").left()
    }