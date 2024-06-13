// SPDX-License-Identifier: CC-BY-4.0
// This work is licensed under the Creative Commons Attribution 4.0 International (CC BY 4.0) License.
// To view a copy of this license, visit https://creativecommons.org/licenses/by/4.0/
// Author: Andreas Timm
// Repository: https://github.com/andreas-timm/logo
// Version: 0.1.0
// @sha256sum 0x5ae27425ed95c9619d1fe62fc4d78400dfdc7a3155e2f4a8d0b6b006cf24c606
// @eip191signature 0x0e06b1f76f9e738f5dffd960e978f6d2a96a4ff1e886533afb62480a2cdba340645477141db787c9c415fc25db5bfae35fbe594542cca5ed94bddfdab47173cb1c

import { component$ } from '@builder.io/qwik'

type SecData = {
    x: number
    y: number
    radius: number
    angle: number
    fraction: number
}

type ArcData = {
    x: number
    y: number
    rx: number
    ry: number
    ex: number
    ey: number
}

function calcSec(w: SecData): ArcData {
    const angle = (Math.PI * w.angle) / 180
    const fraction = w.radius * w.fraction
    const vec = Math.sqrt(w.radius ** 2 - fraction ** 2)
    const dx = fraction * Math.sin(angle) + vec * Math.cos(angle)
    const dy = fraction * Math.cos(angle) - vec * Math.sin(angle)
    const x1 = w.x - dx
    const y1 = w.y - dy
    const x2 = x1 + 2 * vec * Math.cos(angle)
    const y2 = y1 - 2 * vec * Math.sin(angle)

    return { x: x1, y: y1, rx: w.radius, ry: w.radius, ex: x2, ey: y2 }
}

export const Logo = component$(() => {
    const size = 1000
    const center = size / 2
    const angle = 26
    const fraction = 0.68

    const arc = calcSec({ x: center, y: center, radius: center, angle, fraction })
    const arcMain = `M${arc.x},${arc.y} A${arc.rx},${arc.ry},0,1,0,${arc.ex},${arc.ey}`
    const arcSec = `M${arc.x},${arc.y} A${arc.rx},${arc.ry},0,0,1,${arc.ex},${arc.ey}`

    return (
        <svg viewBox='0 0 1000 1000' width='1000' height='1000' xmlns='http://www.w3.org/2000/svg'>
            <path d={arcSec} fill='#bef0ff' />
            <path d={arcMain} fill='#f8f1da' />
        </svg>
    )
})
