package com.example

import com.example.state.ServerState
import io.ktor.server.routing.*
import io.ktor.server.response.*
import io.ktor.server.application.*
import java.util.concurrent.atomic.AtomicReference

fun Application.configureRouting(serverState: AtomicReference<ServerState>) {
    routing {
        get("/") {
            call.respondText("Hello World!")
        }
    }
}
