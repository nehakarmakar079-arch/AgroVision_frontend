import React from 'react';
import { Database } from 'lucide-react';

export default function DemoBadge({ label = 'DEMO DATA' }) {
  return (
    <span className="badge badge-demo" title="This metric is simulated demonstration data representing real NASA / ICAR formats">
      <Database size={12} />
      {label}
    </span>
  );
}
