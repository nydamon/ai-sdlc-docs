-- AI-SDLC PostgreSQL Database Initialization
-- Creates tables for storing metrics, validation results, and automation analytics

-- Create extension for UUID generation
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Validation Results Table
CREATE TABLE validation_results (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    validation_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    overall_score INTEGER NOT NULL,
    total_checks INTEGER NOT NULL,
    passed_checks INTEGER NOT NULL,
    failed_checks INTEGER NOT NULL,
    warning_checks INTEGER NOT NULL,
    project_type VARCHAR(50),
    git_branch VARCHAR(100),
    git_commit_hash VARCHAR(40),
    raw_output TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Project Metrics Table
CREATE TABLE project_metrics (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    metric_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    project_name VARCHAR(100),
    project_version VARCHAR(20),
    total_files INTEGER,
    js_files INTEGER,
    test_files INTEGER,
    dependencies_count INTEGER,
    dev_dependencies_count INTEGER,
    uncommitted_changes INTEGER,
    recent_commits INTEGER,
    code_coverage DECIMAL(5,2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Test Results Table
CREATE TABLE test_results (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    test_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    test_type VARCHAR(20) NOT NULL, -- unit, e2e, coverage
    total_tests INTEGER,
    passed_tests INTEGER,
    failed_tests INTEGER,
    skipped_tests INTEGER,
    execution_time_ms INTEGER,
    coverage_percentage DECIMAL(5,2),
    git_branch VARCHAR(100),
    git_commit_hash VARCHAR(40),
    raw_output TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Automation Events Table
CREATE TABLE automation_events (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    event_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    event_type VARCHAR(50) NOT NULL, -- validation, repair, commit, deploy
    event_status VARCHAR(20) NOT NULL, -- success, failure, warning
    description TEXT,
    git_branch VARCHAR(100),
    git_commit_hash VARCHAR(40),
    metadata JSONB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Performance Metrics Table
CREATE TABLE performance_metrics (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    metric_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    test_name VARCHAR(100),
    response_time_ms INTEGER,
    throughput_rps DECIMAL(10,2),
    error_rate DECIMAL(5,2),
    p95_response_time_ms INTEGER,
    p99_response_time_ms INTEGER,
    git_branch VARCHAR(100),
    git_commit_hash VARCHAR(40),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better performance
CREATE INDEX idx_validation_results_date ON validation_results(validation_date);
CREATE INDEX idx_validation_results_score ON validation_results(overall_score);
CREATE INDEX idx_project_metrics_date ON project_metrics(metric_date);
CREATE INDEX idx_project_metrics_name ON project_metrics(project_name);
CREATE INDEX idx_test_results_date ON test_results(test_date);
CREATE INDEX idx_test_results_type ON test_results(test_type);
CREATE INDEX idx_automation_events_date ON automation_events(event_date);
CREATE INDEX idx_automation_events_type ON automation_events(event_type);
CREATE INDEX idx_performance_metrics_date ON performance_metrics(metric_date);
CREATE INDEX idx_performance_metrics_name ON performance_metrics(test_name);

-- Insert sample data for testing
INSERT INTO validation_results (overall_score, total_checks, passed_checks, failed_checks, warning_checks, project_type, git_branch)
VALUES (92, 28, 26, 0, 2, 'Laravel+React', 'master');

INSERT INTO project_metrics (project_name, project_version, total_files, js_files, test_files, dependencies_count, dev_dependencies_count)
VALUES ('ai-sdlc-framework', '1.0.0', 150, 45, 15, 25, 35);

INSERT INTO automation_events (event_type, event_status, description, git_branch)
VALUES ('validation', 'success', 'AI-SDLC validation completed successfully', 'master');