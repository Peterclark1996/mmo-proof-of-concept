package com.example.events

import arrow.core.Either
import com.example.state.Connection
import com.example.state.ServerState

interface IReceivable {
    suspend fun onReceive(currentConnection: Connection, serverState: ServerState): Either<Error, Unit>
}