package com.example

import com.example.state.ServerState
import io.ktor.server.routing.*
import io.ktor.server.response.*
import io.ktor.server.application.*
import io.ktor.server.http.content.*
import java.io.File
import java.util.concurrent.atomic.AtomicReference

fun Application.configureRouting(serverState: AtomicReference<ServerState>) {
    routing {
        static("/") {
            staticRootFolder = File("client")

            file("index.html")
            default("index.html")

            static("assets") {
                files(".")
            }
        }
    }
}
