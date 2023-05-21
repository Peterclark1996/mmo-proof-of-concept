package com.example

import arrow.core.left
import arrow.core.right
import com.example.dtos.PlayerDto
import com.example.func.json
import com.example.state.ServerState
import io.ktor.http.*
import io.ktor.server.routing.*
import io.ktor.server.response.*
import io.ktor.server.application.*
import io.ktor.server.http.content.*
import kotlinx.serialization.encodeToString
import kotlinx.serialization.json.Json
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

        route("/api") {
            get("/players") {
                val playerDtos = serverState.get().connections.map {
                    PlayerDto(
                        it.id,
                        it.username
                    )
                }

                val json = try {
                    Json.encodeToString(playerDtos).right()
                } catch (error: Error) {
                    error.left()
                }

                json.fold({ call.respond(HttpStatusCode.InternalServerError) }, { call.respondText(it) })
            }
        }
    }
}