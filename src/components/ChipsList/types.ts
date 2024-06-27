export type Props = {
    items: ChipsListItems[],
    onClose: (id: number) => void
}

export type ChipsListItems = {
    id: number,
    label: string,
}