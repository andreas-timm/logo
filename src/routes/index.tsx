import { $, component$, render } from '@builder.io/qwik'
import type { DocumentHead } from '@builder.io/qwik-city'
import { Logo } from '~/components/logo'
import { Button } from '~/components/ui/button/button'

export default component$(() => {
    const logo = <Logo />

    const handleClick = $(async () => {
        const container = document.createElement('div')
        await render(container, logo)
        const svg = container.innerHTML
            .replace(/\s+data-qwik-inspector="\S+?"/g, '')
            .replace(/<!--\/?qv\s*-->/g, '')
        const blob = new Blob([svg], { type: 'image/svg+xml' })
        const url = window.URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.href = url
        link.download = 'at-logo.svg'
        link.click()
        window.URL.revokeObjectURL(url)

        console.log('clicked')
    })

    return (
        <>
            <Button look='primary' onClick$={handleClick}>
                Download
            </Button>
            <div>
                <div class='inline-block border'>{logo}</div>
            </div>
        </>
    )
})

export const head: DocumentHead = {
    title: 'AT logo',
    meta: [
        {
            name: 'description',
            content: 'AT logo',
        },
    ],
}
