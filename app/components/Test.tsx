type Props = {
  name: string
}

export default function Test({ name }: Props) {
  return <p>名前：{name}</p>
}