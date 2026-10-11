type Props = {
  title: string
} & React.ButtonHTMLAttributes<HTMLButtonElement>
export const Button = (props: Props) => {
  return (
    <button
      {...props}
      className='rounded-none uppercase tracking-wider font-medium text-sm bg-primary text-primary-foreground h-10 px-4 py-2 transition-colors hover:bg-primary/90'
    >
      {props.title}
    </button>
  )
}
