<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Posts</title>
    @vite(['resources/css/app.css', 'resources/js/app.js'])
</head>
<body class="min-h-screen bg-slate-100 text-slate-900">
    <div class="relative min-h-screen">
        <div class="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,_#7dd3fc,_transparent_45%),radial-gradient(circle_at_80%_10%,_#fde68a,_transparent_35%),linear-gradient(180deg,_#f8fafc,_#e2e8f0)]"></div>

        <main class="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
            <div class="mb-6 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-white/85 p-6 shadow-sm backdrop-blur">
                <div>
                    <h1 class="text-3xl font-bold tracking-tight text-slate-900">All Posts</h1>
                </div>
                <a
                    href="{{ route('posts.create') }}"
                    class="inline-flex items-center gap-2 rounded-lg bg-cyan-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-cyan-700"
                >
                    Create Post
                </a>
            </div>

            @if (session('success'))
                <div class="mb-6 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
                    {{ session('success') }}
                </div>
            @endif

            @if ($posts->isEmpty())
                <div class="rounded-2xl border border-dashed border-slate-300 bg-white/80 p-10 text-center shadow-sm">
                    <h2 class="text-lg font-semibold text-slate-800">No posts yet</h2>
                    <p class="mt-2 text-sm text-slate-500">Create your first post to see it appear here.</p>
                </div>
            @else
                <div class="grid gap-4 sm:grid-cols-2">
                    @foreach ($posts as $post)
                        <article class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md">
                            <h2 class="line-clamp-2 text-xl font-semibold text-slate-900">{{ $post->title }}</h2>
                            <p class="mt-3 line-clamp-3 text-sm text-slate-600">{{ $post->content }}</p>
                            <div class="mt-5 flex items-center justify-between">
                                <p class="text-xs font-medium uppercase tracking-wider text-slate-400">{{ $post->created_at->format('M d, Y') }}</p>
                                <a href="{{ route('posts.show', $post) }}" class="text-sm font-semibold text-cyan-700 hover:text-cyan-800">Read More</a>
                            </div>
                        </article>
                    @endforeach
                </div>
            @endif
        </main>
    </div>
</body>
</html>
