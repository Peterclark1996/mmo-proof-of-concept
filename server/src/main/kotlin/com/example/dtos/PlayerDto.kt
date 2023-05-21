package com.example.dtos

import kotlinx.serialization.Serializable

@Serializable
data class PlayerDto(
    val id: Int,
    val username: String
)