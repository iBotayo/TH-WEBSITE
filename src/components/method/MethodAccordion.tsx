'use client';

import React, { useState } from 'react';
import { MethodStep } from '@/content/static/method';
import styles from './MethodAccordion.module.css';

interface MethodAccordionProps {
  steps: MethodStep[];
}

export default function MethodAccordion({ steps }: MethodAccordionProps) {
  // Store expanded state per step (default open first 2 or all)
  const [expandedSteps, setExpandedSteps] = useState<Record<string, boolean>>({
    '01': true,
    '02': true,
    '03': true,
    '04': true,
    '05': true,
    '06': true,
    '07': true,
    '08': true,
  });

  const toggleStep = (stepNumber: string) => {
    setExpandedSteps((prev) => ({
      ...prev,
      [stepNumber]: !prev[stepNumber],
    }));
  };

  return (
    <div className={styles.timeline} role="region" aria-label="Eight-Step Methodology Stages">
      {steps.map((item) => {
        const isExpanded = Boolean(expandedSteps[item.step]);
        const bodyId = `step-body-${item.step}`;
        const headerId = `step-header-${item.step}`;

        return (
          <div key={item.step} className={styles.stepCard}>
            <button
              id={headerId}
              type="button"
              className={styles.stepHeader}
              onClick={() => toggleStep(item.step)}
              aria-expanded={isExpanded}
              aria-controls={bodyId}
            >
              <div className={styles.headerLeft}>
                <span className={styles.stepNumber}>{item.step}</span>
                <h3 className={styles.stepName}>{item.name}</h3>
              </div>
              <span
                className={`${styles.icon} ${isExpanded ? styles.openIcon : ''}`}
                aria-hidden="true"
              >
                ▼
              </span>
            </button>

            {isExpanded && (
              <div
                id={bodyId}
                role="region"
                aria-labelledby={headerId}
                className={styles.stepBody}
              >
                <p className={styles.description}>{item.description}</p>
                <div className={styles.deliverableBox}>
                  <div className={styles.deliverableLabel}>You receive:</div>
                  <p className={styles.deliverableText}>{item.deliverable}</p>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
