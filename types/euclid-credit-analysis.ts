export interface EuclidCreditAnalysisSchema {
    loan_type: string,
    loan_amount: number,
    loan_currency: string,
    loan_duration_in_months: number,
    first_name: string | undefined,
    last_name: string | undefined,
    bvn?: number | undefined,
    recipient_type: "individual" | "business",
    password?: string | undefined,
    file_url: string
  }