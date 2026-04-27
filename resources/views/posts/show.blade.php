<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>{{ $post->title }}</title>
    @vite(['resources/css/app.css', 'resources/js/app.js'])
</head>
<body class="min-h-screen bg-slate-100 text-slate-900">
    <div class="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_10%_0%,_#a7f3d0,_transparent_30%),radial-gradient(circle_at_90%_0%,_#93c5fd,_transparent_35%),linear-gradient(180deg,_#ecfeff,_#f8fafc)]"></div>

    <main class="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
        @if (session('success'))
            <div class="mb-6 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
                {{ session('success') }}
            </div>
        @endif

        <article class="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <header class="border-b border-slate-100 px-6 py-5">
                <p class="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700">Post Details</p>
                <h1 class="mt-2 text-3xl font-bold tracking-tight text-slate-900">{{ $post->title }}</h1>
                <p class="mt-2 text-sm text-slate-500">Published {{ $post->created_at->format('M d, Y \a\t h:i A') }}</p>
            </header>

            <div class="px-6 py-6">
                <p class="whitespace-pre-line leading-7 text-slate-700">{{ $post->content }}</p>
            </div>

            <footer class="flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 bg-slate-50 px-6 py-4">
                <a href="{{ route('posts.index') }}" class="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-white">Back to Posts</a>

                <div class="flex items-center gap-3">
                    <a href="{{ route('posts.edit', $post) }}" class="rounded-lg bg-amber-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-amber-600">Edit</a>

                    <form action="{{ route('posts.destroy', $post) }}" method="POST" onsubmit="return confirm('Delete this post?');">
                        @csrf
                        @method('DELETE')
                        <button type="submit" class="rounded-lg bg-rose-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-rose-700">Delete</button>
                    </form>
                </div>
            </footer>
        </article>
    </main>
</body>
</html>
