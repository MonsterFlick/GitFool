import { BookOpen, Zap, RefreshCw, Code2 } from "lucide-react"

const features = [
  {
    icon: BookOpen,
    title: "Quality Content",
    description: "Curated tech articles written by developers, for developers.",
  },
  {
    icon: Zap,
    title: "Real-time Updates",
    description: "New posts appear instantly when pushed to the repository.",
  },
  {
    icon: RefreshCw,
    title: "Always Fresh",
    description: "Content syncs automatically with the latest GitHub commits.",
  },
  {
    icon: Code2,
    title: "Open Source",
    description: "All content is open source and community-driven.",
  },
]

export function AboutSection() {
  return (
    <section className="py-16 md:py-24 bg-card border-y border-border">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">What is GitFool?</h2>
          <p className="text-muted-foreground text-lg">
            GitFool is a modern tech blog platform that fetches content directly from GitHub. Write your blogs in
            Markdown, push to the repo, and they appear here automatically.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="p-6 rounded-xl bg-background border border-border hover:border-primary/50 transition-colors animate-in fade-in slide-in-from-bottom-4"
              style={{ animationDelay: `${index * 100}ms`, animationFillMode: "backwards" }}
            >
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <feature.icon className="h-5 w-5 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
