import { createClient } from '@supabase/supabase-js';

const URL = 'https://khrhdequmbsgnvucspbn.supabase.co';
const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtocmhkZXF1bWJzZ252dWNzcGJuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzczNjg4NjgsImV4cCI6MjA5Mjk0NDg2OH0.uCfA0ED-mIk_DNm57eTFBzAJ3V6h17pc5AQfMd731TE'

export const supabase = createClient(URL, API_KEY);
