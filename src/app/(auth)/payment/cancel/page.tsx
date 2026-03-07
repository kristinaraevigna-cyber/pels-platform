export default function PaymentCancelPage() {
  return (
    <div className="text-center">
      <div className="text-5xl mb-4 text-stone-400">&#10007;</div>
      <h1 className="font-serif text-2xl font-normal text-stone-800 mb-3">
        Payment Cancelled
      </h1>
      <p className="text-stone-500 text-sm leading-relaxed mb-8">
        Your payment was not completed. You can try again whenever you&apos;re
        ready.
      </p>
      <a
        href="/payment"
        className="inline-block px-8 py-3.5 bg-clay-300 text-white rounded-lg text-sm font-semibold transition-colors hover:bg-clay-400"
      >
        Try Again
      </a>
    </div>
  );
}
