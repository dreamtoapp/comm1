// app/components/HeroSection.tsx
export default function HeroSection() {
  return (
    <section className='flex h-[400px] items-center justify-center bg-gray-100'>
      <div className='text-center'>
        <h1 className='text-4xl font-bold'>Summer Sale: 20% Off</h1>
        <p className='mt-2 text-lg'>Discover amazing deals today!</p>
        <button className='mt-4 rounded bg-red-500 px-6 py-3 text-white'>Shop Now</button>
      </div>
    </section>
  );
}
