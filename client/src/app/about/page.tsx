import React from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  ArrowLeft,
  Code,
  Coffee,
  Heart,
  Users,
  Zap,
  Target,
} from 'lucide-react';
import Link from 'next/link';

export default function About() {
  const teamMembers = [
    {
      name: 'The Salty Devs Team',
      role: 'Full-Stack Developers',
      description:
        'Passionate developers sharing knowledge and building amazing web experiences.',
      skills: [
        'React',
        'Next.js',
        'TypeScript',
        'Node.js',
        'PostgreSQL',
        'Prisma',
        'Express',
        'Python',
        'Django',
      ],
    },
  ];

  const technologies = [
    { name: 'Next.js 15', description: 'React framework with App Router' },
    { name: 'TypeScript', description: 'Type-safe JavaScript development' },
    { name: 'Tailwind CSS', description: 'Utility-first CSS framework' },
    { name: 'Shadcn/UI', description: 'Modern, accessible UI components' },
    { name: 'Node.js', description: 'JavaScript runtime for backend' },
    { name: 'Express.js', description: 'Fast, minimalist web framework' },
    { name: 'PostgreSQL', description: 'Powerful, open-source database' },
    { name: 'Prisma', description: 'Type-safe database ORM' },
    { name: 'Python', description: 'Backend development and automation' },
    { name: 'Django', description: 'Python web framework' },
  ];

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <Link href="/">
            <Button variant="outline" className="mb-6">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </Link>

          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              About <span className="gradient-text">The Salty Devs</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              We&apos;re a passionate team of developers dedicated to sharing
              knowledge, building amazing web experiences, and helping the
              developer community grow.
            </p>
          </div>

          {/* Mission Section */}
          <Card className="mb-12">
            <CardHeader>
              <div className="flex items-center gap-3">
                <Target className="w-6 h-6 text-primary" />
                <CardTitle className="text-2xl">Our Mission</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground leading-relaxed">
                At The Salty Devs, we believe in the power of sharing knowledge
                and building community. Our mission is to create high-quality
                content that helps developers at all levels improve their skills
                and stay up-to-date with the latest technologies and best
                practices.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Whether you&apos;re just starting your coding journey or
                you&apos;re a seasoned developer looking to learn something new,
                we&apos;re here to provide practical insights, tutorials, and
                real-world examples that you can apply in your projects.
              </p>
            </CardContent>
          </Card>

          {/* What We Do Section */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-center mb-8">What We Do</h2>
            <div className="grid gap-6 md:grid-cols-3">
              <Card className="text-center">
                <CardHeader>
                  <Code className="w-12 h-12 mx-auto text-primary mb-4" />
                  <CardTitle>Technical Tutorials</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    In-depth guides and tutorials covering modern web
                    development technologies, frameworks, and best practices.
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardHeader>
                  <Zap className="w-12 h-12 mx-auto text-primary mb-4" />
                  <CardTitle>Performance Tips</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Learn how to optimize your applications for speed,
                    scalability, and user experience with practical performance
                    tips.
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardHeader>
                  <Users className="w-12 h-12 mx-auto text-primary mb-4" />
                  <CardTitle>Community Building</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Fostering a supportive community where developers can learn,
                    share experiences, and grow together.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Team Section */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-center mb-8">
              Meet the Team
            </h2>
            <div className="grid gap-6">
              {teamMembers.map((member, index) => (
                <Card key={index}>
                  <CardHeader>
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary/60 rounded-full flex items-center justify-center">
                        <Coffee className="w-8 h-8 text-primary-foreground" />
                      </div>
                      <div>
                        <CardTitle className="text-xl">{member.name}</CardTitle>
                        <CardDescription className="text-base">
                          {member.role}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">
                      {member.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {member.skills.map((skill) => (
                        <Badge key={skill} variant="secondary">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Technology Stack */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-center mb-8">
              Our Tech Stack
            </h2>
            <div className="grid gap-4 md:grid-cols-2">
              {technologies.map((tech, index) => (
                <Card key={index} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold text-lg">{tech.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {tech.description}
                        </p>
                      </div>
                      <Code className="w-5 h-5 text-primary" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Call to Action */}
          <Card className="text-center bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20">
            <CardContent className="p-8">
              <Heart className="w-12 h-12 mx-auto text-primary mb-4" />
              <h2 className="text-2xl font-bold mb-4">Join Our Community</h2>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                Ready to dive into the world of modern web development? Explore
                our articles, learn new skills, and become part of our growing
                community.
              </p>
              <div className="flex gap-4 justify-center flex-wrap">
                <Link href="/">
                  <Button size="lg">Explore Articles</Button>
                </Link>
                <Link href="/categories">
                  <Button variant="outline" size="lg">
                    Browse Categories
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
