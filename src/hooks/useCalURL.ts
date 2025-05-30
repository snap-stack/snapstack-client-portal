
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

export default function useCalURL() {
  const [calUrl, setCalUrl] = useState('#');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCalUrl = async () => {
      try {
        const { data, error } = await supabase
          .from('portal_settings')
          .select('cal_url')
          .single();
        
        if (data && !error) {
          setCalUrl(data.cal_url);
        }
      } catch (err) {
        console.log('Using fallback calendar URL:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCalUrl();
  }, []);

  return { calUrl, loading };
}
