/**
 * API service for communicating with the Flask Loan Default Prediction backend.
 */

const API_BASE_URL = 'https://loanmangment-1.onrender.com';

/**
 * Check backend connection status and latency.
 */
export async function checkBackendStatus() {
  const startTime = Date.now();
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3500);

    const response = await fetch(`${API_BASE_URL}/`, {
      method: 'GET',
      signal: controller.signal,
    });
    clearTimeout(timeoutId);

    if (response.ok) {
      const message = await response.text();
      return {
        online: true,
        message,
        latencyMs: Date.now() - startTime,
      };
    }
    return {
      online: false,
      message: `Status: ${response.status}`,
      latencyMs: Date.now() - startTime,
    };
  } catch (err) {
    return {
      online: false,
      message: err.name === 'AbortError' ? 'Connection timed out' : 'Backend offline or unreachable',
      latencyMs: null,
    };
  }
}

/**
 * Send loan applicant data to Flask backend for assessment.
 * @param {Object} payload Form data matching backend feature columns
 */
export async function predictLoanRisk(payload) {
  try {
    const response = await fetch(`${API_BASE_URL}/predict`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (!response.ok || !data.success) {
      throw new Error(data.error || 'Server rejected prediction request');
    }

    return data;
  } catch (error) {
    console.error('Prediction API Error:', error);
    throw error;
  }
}
