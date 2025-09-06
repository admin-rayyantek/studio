import { PredictionsForm } from '@/components/predictions-form';

export default function PredictionsPage() {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-3xl font-bold tracking-tight">Order Predictions</h1>
      <PredictionsForm />
    </div>
  );
}
