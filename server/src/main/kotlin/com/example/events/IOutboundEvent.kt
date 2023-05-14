package com.example.events

interface IOutboundEvent<T> {
    val type: Int
    val data: T

    companion object {
        const val PlayerPositionsUpdatedEvent = 0
        const val AbilityCastEvent = 1
        const val PlayerUsernameRequestEvent = 2
    }
}