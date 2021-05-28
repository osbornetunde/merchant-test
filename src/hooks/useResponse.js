import React, { useEffect, useState } from 'react';
import { useToasts } from 'react-toast-notifications';

const useResponse = (data, messages, error, hideMessage) => {
    const { addToast } = useToasts();
    const [result, setResult] = useState({});
    useEffect(() => {
        if (data) {
            if (Object.entries(data).length === 0) return;
            if (data?.data && data?.data?.data !== null) {
                if (!hideMessage) {
                    addToast(
                        `${data?.data?.message ?? data?.data?.data?.statusDesc ?? data?.data?.statusDesc ?? messages}`,
                        { appearance: 'success' },
                    );
                }
                setResult(data?.data);
            } else {
                addToast(`${data?.data?.message ?? error}`, { appearance: 'error' });
            }
        }
    }, [data]);
    return { result };
};

export { useResponse };
