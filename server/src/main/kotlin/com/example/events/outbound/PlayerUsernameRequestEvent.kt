package com.example.events.outbound

import com.example.events.IOutboundEvent
import kotlinx.serialization.Serializable

@Serializable
data class PlayerUsernameRequestEvent(
    val type: Int = IOutboundEvent.PlayerUsernameRequestEvent
)