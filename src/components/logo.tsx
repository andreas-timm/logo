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
    r: number
    a: number
    p: number
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
    const a = (Math.PI * w.a) / 180
    const p = w.r * w.p
    const t = Math.sqrt(w.r ** 2 - p ** 2)
    const dx = p * Math.sin(a) + t * Math.cos(a)
    const dy = p * Math.cos(a) - t * Math.sin(a)
    const x1 = w.x - dx
    const y1 = w.y - dy
    const x2 = x1 + 2 * t * Math.cos(a)
    const y2 = y1 - 2 * t * Math.sin(a)

    return { x: x1, y: y1, rx: w.r, ry: w.r, ex: x2, ey: y2 }
}

export const Logo = component$(() => {
    const arc = calcSec({ x: 500, y: 500, r: 500, a: 26, p: 0.68 })
    const arcMain = `M ${arc.x} ${arc.y} A ${arc.rx} ${arc.ry} 0 1 0 ${arc.ex} ${arc.ey}`
    const arcSec = `M ${arc.x} ${arc.y} A ${arc.rx} ${arc.ry} 0 0 1 ${arc.ex} ${arc.ey}`

    return (
        <svg viewBox='0 0 1000 1000' width='1000' height='1000' xmlns='http://www.w3.org/2000/svg'>
            <path d={arcSec} fill='#bef0ff' />
            <path d={arcMain} fill='#f8f1da' />
        </svg>
    )
})
