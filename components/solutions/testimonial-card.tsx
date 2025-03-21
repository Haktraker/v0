import Image from "next/image"

interface TestimonialCardProps {
  quote: string
  author: string
  title: string
  image: string
  index: number
}

export function TestimonialCard({ quote, author, title, image, index }: TestimonialCardProps) {
  return (
    <div className="bg-card p-6 rounded-lg" data-aos="fade-up" data-aos-delay={index * 100}>
      <div className="mb-4">
        <svg className="h-8 w-8 text-cyber-primary/50" fill="currentColor" viewBox="0 0 24 24">
          <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
        </svg>
      </div>
      <p className="text-foreground/80 mb-6 italic">{quote}</p>
      <div className="flex items-center">
        <div className="h-12 w-12 rounded-full overflow-hidden mr-4">
          <Image src={image || "/placeholder.svg"} alt={author} width={48} height={48} className="object-cover" />
        </div>
        <div>
          <h4 className="font-bold">{author}</h4>
          <p className="text-sm text-foreground/60">{title}</p>
        </div>
      </div>
    </div>
  )
}

